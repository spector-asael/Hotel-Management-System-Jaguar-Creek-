export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;  // Add lastName to the User interface
  phoneNumber: string;

  authenticate(username: string, password: string): number;
  sendMessage(
    messageMap: Map<number, string[]>,
    content: string,
    senderID: number,
    receiverID: number
  ): void;
  deleteMessage(messageNode: string): boolean;

  // Getters & Setters
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

  // Add getters and setters for lastName
  getLastName(): string;
  setLastName(name: string): void;
}
