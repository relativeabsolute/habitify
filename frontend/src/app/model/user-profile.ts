export interface IUserProfileImage {
    url: string;
    height: number;
    width: number;
}

export interface IUserProfile {
    display_name: string;
    images: IUserProfileImage[];
}
