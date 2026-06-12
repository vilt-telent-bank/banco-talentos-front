export interface ProfileSkill {
    name?: string;
    level?: string | number;
    type?: string;
    proficiencyLevel?: string | number;
    skill?: {
        name: string;
        type?: string;
    };
}

export interface UserProfile {
    id: string;
    status: "PENDING" | "ACTIVE" | string;
    nivel?: string;
    levelOverride?: string;
    photoUrl?: string;
    area?: string;
    about?: string;
    allocationStatus?: string;
    careerPath?: string;
    experienceYears?: string | number;
    linkedinUrl?: string;
    githubUrl?: string;
    registrationNumber?: string;
    registrationStatus?: string;
    skills?: ProfileSkill[];
    createdAt?: string;
    user?: {
        name: string;
        email: string;
    };
}

export interface ProfileFormState {
    area: string;
    about: string;
    allocationStatus: string;
    careerPath: string;
    experienceYears: string | number;
    linkedinUrl: string;
    githubUrl: string;
    levelOverride: string;
    registrationNumber: string;
    registrationStatus: string;
    softSkills: { name: string; level: number }[];
}