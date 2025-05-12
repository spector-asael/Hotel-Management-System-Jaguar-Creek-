import { User } from "../interface/usersInterfacesH";

export class UserClass implements User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string
  ) {}

  authenticate(username: string, password: string): number {
    if (this.username === username && this.password === password) {
      // Mock authentication levels
      if (this.username === "admin") return 2;
      if (this.username.startsWith("emp")) return 1;
      return 0;
    }
    return -1; // Failed login
  }

  sendMessage(
    messageMap: Map<number, string[]>,
    content: string,
    senderID: number,
    receiverID: number
  ): void {
    const key = receiverID;
    if (!messageMap.has(key)) {
      messageMap.set(key, []);
    }
    messageMap.get(key)?.push(`From ${senderID}: ${content}`);
  }

  deleteMessage(messageNode: string): boolean {
    // Mock delete logic
    // You might use message ID or index in actual implementation
    // Just returns true here
    return true;
  }

  // Getters & Setters
  getID(): number {
    return this.id;
  }

  setID(id: number): void {
    this.id = id;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  setPhoneNumber(phone: string): void {
    this.phoneNumber = phone;
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(name: string): void {
    this.firstName = name;
  }
  // Adding missing getter and setter for lastName
  getLastName(): string {
    return this.lastName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }
}
