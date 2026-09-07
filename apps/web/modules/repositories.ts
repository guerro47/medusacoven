import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase/server';
import type {
  AccessPassTier,
  CreatorProfile,
  Drop,
  Membership,
  Tip,
} from './contracts';

/**
 * Persistence ports + Supabase adapters for the module layer.
 *
 * Read-side only for the founding beta; writes land with the module
 * engines (per plan order). Rows are mapped to contract DTOs at this
 * boundary — snake_case never crosses it. RLS on these tables grants
 * the anon role nothing; server-side access runs under the session
 * user's scoped policies once Stytch JWT mapping ships, and until then
 * every method returns honest empties instead of inventing data.
 */

export interface CreatorsRepository {
  findByUserId(userId: string): Promise<CreatorProfile | null>;
}

export interface AccessPassRepository {
  listTiers(creatorId: string): Promise<AccessPassTier[]>;
  listMemberships(creatorId: string): Promise<Membership[]>;
}

export interface DropsRepository {
  listByCreator(creatorId: string): Promise<Drop[]>;
}

export interface TipsRepository {
  listRecent(creatorId: string, limit: number): Promise<Tip[]>;
}

export interface ModuleRepositories {
  creators: CreatorsRepository;
  accessPass: AccessPassRepository;
  drops: DropsRepository;
  tips: TipsRepository;
}

/* ── Row shapes (private to this adapter) ─────────────────────────── */

interface CreatorRow {
  id: string;
  user_id: string;
  handle: string;
  display_name: string;
  created_at: string;
}

interface TierRow {
  id: string;
  creator_id: string;
  name: string;
  price_minor: number;
  currency: AccessPassTier['currency'];
  billing_interval: AccessPassTier['interval'];
  active: boolean;
  created_at: string;
}

interface MembershipRow {
  id: string;
  tier_id: string;
  fan_user_id: string;
  status: Membership['status'];
  started_at: string;
  renews_at: string | null;
}

interface DropRow {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  price_minor: number;
  currency: Drop['currency'];
  status: Drop['status'];
  opens_at: string | null;
  closes_at: string | null;
  edition_limit: number | null;
  sold_count: number;
  created_at: string;
}

interface TipRow {
  id: string;
  creator_id: string;
  fan_user_id: string | null;
  amount_minor: number;
  currency: Tip['currency'];
  processor: Tip['processor'];
  status: Tip['status'];
  created_at: string;
}

/* ── Mappers ──────────────────────────────────────────────────────── */

const toCreator = (r: CreatorRow): CreatorProfile => ({
  id: r.id,
  userId: r.user_id,
  handle: r.handle,
  displayName: r.display_name,
  createdAt: r.created_at,
});

const toTier = (r: TierRow): AccessPassTier => ({
  id: r.id,
  creatorId: r.creator_id,
  name: r.name,
  priceMinor: r.price_minor,
  currency: r.currency,
  interval: r.billing_interval,
  active: r.active,
  createdAt: r.created_at,
});

const toMembership = (r: MembershipRow): Membership => ({
  id: r.id,
  tierId: r.tier_id,
  fanUserId: r.fan_user_id,
  status: r.status,
  startedAt: r.started_at,
  renewsAt: r.renews_at,
});

const toDrop = (r: DropRow): Drop => ({
  id: r.id,
  creatorId: r.creator_id,
  title: r.title,
  description: r.description,
  priceMinor: r.price_minor,
  currency: r.currency,
  status: r.status,
  opensAt: r.opens_at,
  closesAt: r.closes_at,
  editionLimit: r.edition_limit,
  soldCount: r.sold_count,
  createdAt: r.created_at,
});

const toTip = (r: TipRow): Tip => ({
  id: r.id,
  creatorId: r.creator_id,
  fanUserId: r.fan_user_id,
  amountMinor: r.amount_minor,
  currency: r.currency,
  processor: r.processor,
  status: r.status,
  createdAt: r.created_at,
});

/* ── Supabase adapters ────────────────────────────────────────────── */

function supabaseRepositories(db: SupabaseClient): ModuleRepositories {
  return {
    creators: {
      async findByUserId(userId) {
        const { data, error } = await db
          .from('creators')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle<CreatorRow>();
        if (error) throw new Error(`creators.findByUserId failed: ${error.message}`);
        return data ? toCreator(data) : null;
      },
    },
    accessPass: {
      async listTiers(creatorId) {
        const { data, error } = await db
          .from('access_pass_tiers')
          .select('*')
          .eq('creator_id', creatorId)
          .order('created_at', { ascending: true })
          .returns<TierRow[]>();
        if (error) throw new Error(`accessPass.listTiers failed: ${error.message}`);
        return (data ?? []).map(toTier);
      },
      async listMemberships(creatorId) {
        const { data, error } = await db
          .from('memberships')
          .select('*, access_pass_tiers!inner(creator_id)')
          .eq('access_pass_tiers.creator_id', creatorId)
          .returns<MembershipRow[]>();
        if (error) throw new Error(`accessPass.listMemberships failed: ${error.message}`);
        return (data ?? []).map(toMembership);
      },
    },
    drops: {
      async listByCreator(creatorId) {
        const { data, error } = await db
          .from('drops')
          .select('*')
          .eq('creator_id', creatorId)
          .order('created_at', { ascending: false })
          .returns<DropRow[]>();
        if (error) throw new Error(`drops.listByCreator failed: ${error.message}`);
        return (data ?? []).map(toDrop);
      },
    },
    tips: {
      async listRecent(creatorId, limit) {
        const { data, error } = await db
          .from('tips')
          .select('*')
          .eq('creator_id', creatorId)
          .order('created_at', { ascending: false })
          .limit(limit)
          .returns<TipRow[]>();
        if (error) throw new Error(`tips.listRecent failed: ${error.message}`);
        return (data ?? []).map(toTip);
      },
    },
  };
}

/**
 * Returns the module repositories, or null when the data backend is not
 * configured — callers surface the honest state, never fake data.
 */
export function getModuleRepositories(): ModuleRepositories | null {
  const db = getSupabase();
  return db ? supabaseRepositories(db) : null;
}
