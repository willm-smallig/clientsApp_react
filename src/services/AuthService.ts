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
    const {error} = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }
  static async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
  static async isAuthenticated() {
    const session = await this.getSession(); //obtiene la sesión (objeto o null)
    return !!session; // Devuelve true si la sesión está activa, false si no lo está
  }
}
