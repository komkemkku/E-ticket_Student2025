export interface Page {
  name: string;
  path: string;
  active: boolean;
}

export interface Login {
  email: string;
  student_id: string;
}

export interface Register {
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  student_id: string;
  faculty: string;
  medical_condition: string;
  food_allergies: string;
}
