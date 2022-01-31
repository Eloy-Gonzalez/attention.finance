const ENV_LOCAL = true

export const BASE_API = ENV_LOCAL
	? "http://localhost:5000/api"
	: "https://attentionfinance.andersa.repl.co/api"
export const TOKEN = "x-attention-token"
export const API_KEY = "4p1k3y"
