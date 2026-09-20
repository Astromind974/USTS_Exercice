export interface Email {
  id: string;
  sender: string;
  subject: string;
  content: string;
  date: string;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  emailId: string;
  content: string;
  isAuto: boolean;
  createdAt: string;
}

export interface Summary {
  id: string;
  content: string;
  date: string;
}
