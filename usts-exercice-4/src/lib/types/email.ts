export interface Email {
  id: string;
  sender: string;
  subject: string;
  content: string;
  date: string; // ISO date string
}

export interface Reply {
  to: string;
  subject: string;
  content: string;
}
