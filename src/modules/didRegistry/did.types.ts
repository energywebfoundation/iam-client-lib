export interface AssetProfile {
    name?: string;
    icon?: string;
}

export interface AssetProfiles {
    [key: string]: AssetProfile;
}

export interface Profile {
    name?: string;
    birthdate?: string;
    address?: string;
    assetProfiles?: AssetProfiles;
}

export interface ClaimData extends Record<string, unknown> {
    profile?: Profile;
    claimType?: string;
    claimTypeVersion?: number;
}
