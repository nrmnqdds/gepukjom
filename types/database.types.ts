export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	public: {
		Tables: {
			branches: {
				Row: {
					created_at: string;
					id: string;
					location: string | null;
					outlet_id: string | null;
					state: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					location?: string | null;
					outlet_id?: string | null;
					state?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					location?: string | null;
					outlet_id?: string | null;
					state?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "branches_outlet_id_fkey";
						columns: ["outlet_id"];
						isOneToOne: false;
						referencedRelation: "outlets";
						referencedColumns: ["id"];
					},
				];
			};
			outlets: {
				Row: {
					created_at: string;
					id: string;
					logo: string | null;
					name: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					logo?: string | null;
					name?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					logo?: string | null;
					name?: string | null;
				};
				Relationships: [];
			};
			users: {
				Row: {
					created_at: string | null;
					email: string | null;
					id: string;
					password: string | null;
					sessionToken: string | null;
					username: string | null;
					verified: boolean | null;
					verifyToken: string | null;
				};
				Insert: {
					created_at?: string | null;
					email?: string | null;
					id?: string;
					password?: string | null;
					sessionToken?: string | null;
					username?: string | null;
					verified?: boolean | null;
					verifyToken?: string | null;
				};
				Update: {
					created_at?: string | null;
					email?: string | null;
					id?: string;
					password?: string | null;
					sessionToken?: string | null;
					username?: string | null;
					verified?: boolean | null;
					verifyToken?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database["public"]["Tables"] & Database["public"]["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
				Database["public"]["Views"])
	  ? (Database["public"]["Tables"] &
				Database["public"]["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
		  }
			? R
			: never
	  : never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database["public"]["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
	  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
		  }
			? I
			: never
	  : never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database["public"]["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
	  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
		  }
			? U
			: never
	  : never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database["public"]["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
	  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
	  : never;
