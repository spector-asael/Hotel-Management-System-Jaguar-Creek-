import { User } from "../interfaces/usersInterfacesH";
import pool from "../db/config"; // Adjust path to your db connection

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
      if (this.username === "admin") return 2;
      if (this.username.startsWith("emp")) return 1;
      return 0;
    }
    return -1;
  }

  async sendMessage(content: string, senderID: number, receiverID: number): Promise<void> {
    try {
      // Step 1: Find or create a conversation between sender and receiver
      let conversationRes = await pool.query(
        `SELECT id FROM conversations 
         WHERE (guest_id = $1 AND employee_id = $2)
            OR (guest_id = $2 AND employee_id = $1) 
         LIMIT 1`,
        [senderID, receiverID]
      );

      let conversationID;

      if (conversationRes.rows.length === 0) {
        const newConv = await pool.query(
          `INSERT INTO conversations (guest_id, employee_id) 
           VALUES ($1, $2) RETURNING id`,
          [senderID, receiverID]
        );
        conversationID = newConv.rows[0].id;
      } else {
        conversationID = conversationRes.rows[0].id;
      }

      // Step 2: Insert the message
      await pool.query(
        `INSERT INTO messages (conversation_id, author_id, content) 
         VALUES ($1, $2, $3)`,
        [conversationID, senderID, content]
      );
    } catch (err) {
      console.error("Error sending message:", err);
      throw err;
    }
  }

  async deleteMessage(messageID: number): Promise<boolean> {
    try {
      const res = await pool.query(`DELETE FROM messages WHERE id = $1`, [messageID]);
      return typeof res.rowCount === 'number' && res.rowCount > 0;
    } catch (err) {
      console.error("Error deleting message:", err);
      return false;
    }
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

  getLastName(): string {
    return this.lastName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }
}
