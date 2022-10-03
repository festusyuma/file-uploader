import {
  databaseConnectionErrorMsg,
  databaseErrorMsg,
  unknownDatabaseErrorMsg,
} from '@utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const repo = async <T = unknown>(
  func: () => T
): Promise<{ data?: T; error?: string }> => {
  try {
    return { data: await func() };
  } catch (e: unknown) {
    console.error(databaseErrorMsg);

    let error = unknownDatabaseErrorMsg;
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code.startsWith('P10')) error = databaseConnectionErrorMsg;
      else if (e.code.startsWith('P20')) error = databaseErrorMsg;
      console.error(e.message);
    } else console.error(e);

    return { error };
  }
};
