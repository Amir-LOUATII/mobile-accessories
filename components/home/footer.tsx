import { Smartphone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return    <footer className="bg-card border-t border-border/50 py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                    <Smartphone className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <span className="font-black text-lg">MobileGros</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Votre partenaire grossiste pour les accessoires mobiles. Qualité, prix compétitifs et service professionnel.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-foreground/70">Entreprise</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <Link href="/about" className="hover:text-primary transition-colors duration-200">
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Recrutement
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-foreground/70">Produits</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <Link href="/products" className="hover:text-primary transition-colors duration-200">
                      Catalogue
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="hover:text-primary transition-colors duration-200">
                      Nouveautés
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Promotions
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-foreground/70">Assistance</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Conditions Générales
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors duration-200">
                      Politique de Retour
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © 2026 MobileGros. Tous droits réservés.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors duration-200">
                  Confidentialité
                </Link>
                <Link href="/" className="hover:text-primary transition-colors duration-200">
                  Mentions légales
                </Link>
              </div>
            </div>
          </div>
        </footer>
}