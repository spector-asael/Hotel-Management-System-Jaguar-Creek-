export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  authenticate(username: string, password: string): number;
  sendMessage(content: string, senderID: number, receiverID: number): Promise<void>;
  deleteMessage(messageID: number): Promise<boolean>;

  getID(): number;
  setID(id: number): void;

  getPhoneNumber(): string;
  setPhoneNumber(phone: string): void;

  getUsername(): string;
  setUsername(username: string): void;

  getPassword(): string;
  setPassword(password: string): void;

  getFirstName(): string;
  setFirstName(name: string): void;

  getLastName(): string;
  setLastName(name: string): void;
}
