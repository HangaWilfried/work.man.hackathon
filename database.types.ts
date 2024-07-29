export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Profile: {
        Row: {
          certifications: Json | null
          contact: Json | null
          created_at: string
          id: string
          qualifications: Json | null
        }
        Insert: {
          certifications?: Json | null
          contact?: Json | null
          created_at?: string
          id?: string
          qualifications?: Json | null
        }
        Update: {
          certifications?: Json | null
          contact?: Json | null
          created_at?: string
          id?: string
          qualifications?: Json | null
        }
        Relationships: []
      }
      Request: {
        Row: {
          created_at: string
          customerId: string | null
          id: string
          workerId: string | null
        }
        Insert: {
          created_at?: string
          customerId?: string | null
          id?: string
          workerId?: string | null
        }
        Update: {
          created_at?: string
          customerId?: string | null
          id?: string
          workerId?: string | null
        }
        Relationships: []
      }
      Request_Stop: {
        Row: {
          request_id: string
          stopTime: string | null
          worker_id: string | null
        }
        Insert: {
          request_id?: string
          stopTime?: string | null
          worker_id?: string | null
        }
        Update: {
          request_id?: string
          stopTime?: string | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Request_Stop_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "Request"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Request_Stop_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Review: {
        Row: {
          created_at: string
          customerId: string | null
          id: string
          message: string | null
          rate: number | null
          workerId: string | null
        }
        Insert: {
          created_at?: string
          customerId?: string | null
          id?: string
          message?: string | null
          rate?: number | null
          workerId?: string | null
        }
        Update: {
          created_at?: string
          customerId?: string | null
          id?: string
          message?: string | null
          rate?: number | null
          workerId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Review_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Review_workerId_fkey"
            columns: ["workerId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          created_at: string
          email: string | null
          id: string
          isAvailable: boolean
          profile_id: string | null
          role: Database["public"]["Enums"]["ROLE"]
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          isAvailable?: boolean
          profile_id?: string | null
          role?: Database["public"]["Enums"]["ROLE"]
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          isAvailable?: boolean
          profile_id?: string | null
          role?: Database["public"]["Enums"]["ROLE"]
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "User_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ROLE: "WORKER" | "USER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
