import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function POST(request: Request) {
  const session = await auth();

  // Only admins can create sellers
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const body = await request.json();
  const { email, name, company, phone } = body;

  if (!email || !name) {
    return NextResponse.json(
      { error: 'Email et nom sont requis' },
      { status: 400 }
    );
  }

  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return NextResponse.json(
      { error: 'Un utilisateur avec cet email existe déjà' },
      { status: 409 }
    );
  }

  // Create the seller user
  const [newUser] = await db
    .insert(users)
    .values({
      email,
      name,
      company: company || null,
      phone: phone || null,
      role: 'seller',
    })
    .returning();

  // Send invitation email with magic link instructions
  try {
    const loginUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/login`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Bienvenue sur VG MobileGros — Votre accès vendeur',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: #6366f1; color: white; font-weight: bold; padding: 12px 16px; border-radius: 12px; font-size: 18px;">VG</div>
          </div>
          <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 16px;">Bienvenue, ${name} !</h1>
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
            Votre compte vendeur a été créé sur <strong>VG MobileGros</strong>.
            ${company ? `Entreprise : <strong>${company}</strong>` : ''}
          </p>
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 24px;">
            Pour accéder à votre espace, cliquez sur le bouton ci-dessous et entrez votre adresse email. Vous recevrez un lien de connexion sécurisé.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${loginUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 15px;">
              Se connecter
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 13px; text-align: center;">
            Utilisez l'adresse <strong>${email}</strong> pour vous connecter.
          </p>
        </div>
      `,
    });
  } catch (emailError) {
    console.error('Failed to send invitation email:', emailError);
    // User is created but email failed — don't fail the request
  }

  return NextResponse.json({
    success: true,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      company: newUser.company,
      phone: newUser.phone,
      role: newUser.role,
    },
  });
}
