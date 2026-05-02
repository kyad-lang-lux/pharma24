import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Récupérer le cookie (On utilise le nom défini dans ton API login)
  const session = request.cookies.get("pharma_session");

  // Debug pour voir si le middleware respire (à vérifier dans le terminal VS Code)
  console.log("🚀 Middleware sur :", pathname, "| Session :", !!session);

  // 2. Définir les pages d'authentification
  const isAuthPage = pathname.startsWith('/connexion') || pathname.startsWith('/inscription');

  // 3. Définir les routes protégées (basé sur ton image et tes dossiers)
  const protectedRoutes = [
    "/dashboard",
    "/abonnement",
    "/mapharmacie",
    "/parametre",
    "/rapports"
  ];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // LOGIQUE DE REDIRECTION
  
  // Cas A : Pas de session et tente d'aller sur une page protégée
  if (!session && isProtectedRoute) {
    const loginUrl = new URL("/connexion", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Cas B : Déjà connecté et tente d'aller sur connexion/inscription
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Utilisons ton style de matcher de Pichflow, il est plus explicite
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/abonnement/:path*",
    "/mapharmacie/:path*",
    "/parametre/:path*",
    "/rapports/:path*",
    "/connexion",
    "/inscription"
  ],
};