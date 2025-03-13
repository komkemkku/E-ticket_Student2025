// types.ts
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    nickname: string;
    email: string;
    student_id: string;
    faculty: string;
    medical_condition: string;
    food_allergies: string;
  }
  
  export interface Event {
    id: number;
    image: Text | null;
    name: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    start_date: string;
    end_date: string;
  }
  
  export interface Ticket {
    id: number;
    user: User;
    event: Event;
    qr_code: Text;
    created_at: string;
  }
  