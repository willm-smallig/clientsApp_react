import { supabase } from "../config/supabase";

export class AuthService {
  static async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,

      password,
    });
    if (error) {
      throw error;
    }
    return data;
  }
  static async logout() {
    await supabase.auth.signOut();
  }
  static async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
  static async isAuthenticated() {
    const session = await this.getSession();
    return !!session;
  }
}
