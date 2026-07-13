import { supabase } from "../config/supabase";
import { Client } from "../interfaces/Client";

export class ClientsService {
  static async getClients() {
    const { data, error } = await supabase.from("clients").select("");

    if (error) {
      throw error;
    }
    return data;
  }

  static async addClient(client: Client) {
    const { error } = await supabase.from("clients").insert([client]);
    if (error) {
      throw error;
    }
  }
} //Cierra clase ClientsService
