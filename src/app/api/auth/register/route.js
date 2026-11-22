// react/next stuff
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// stuff for data
import connectToDB from "@/utils/db";
import User from "@/models/User";
import { MESSAGES } from "@/utils/messages";
import { validateRegistration } from "@/utils/registerValidation";

export const POST = async (request) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: MESSAGES.REGISTER_FAILED }, { status: 400 });
  }

  const { name, email, password } = body ?? {};

  const validationError = validateRegistration({ name, email, password });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    await connectToDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();

    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    // 11000 = duplicate key: the name or the email is already taken
    if (error?.code === 11000) {
      return NextResponse.json({ error: MESSAGES.ACCOUNT_EXISTS }, { status: 409 });
    }
    console.error("POST /api/auth/register failed:", error);
    return NextResponse.json({ error: MESSAGES.REGISTER_FAILED }, { status: 500 });
  }
};
