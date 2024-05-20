'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@repo/db/client';

export async function createOnRampTransactions(
  amount: number,
  provider: string
) {
  // before making a db call extract the user id from the next auth

  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const token = Math.random().toString();

  if (!userId) return { message: 'Login first to continue' };

  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: 'Processing',
      startTime: new Date(),
      provider: provider,
      token,
    },
  });
}
