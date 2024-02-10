export interface Settings {
  general: {
    colorScheme: "dark" | "light" | "system";
    showGradesOnDashboard: boolean;
  };
  profile: {
    name: string;
    email: string;
    dateOfBirth: string | Date;
    privacy: {
      name: boolean;
      email: boolean;
      grades: boolean;
      birthday: boolean;
    };
  };
}
