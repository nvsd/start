import { delay, http, HttpResponse } from "msw";

import {
  LoginRequestBody,
  LoginResponseBody,
  User,
} from "@/api/authentication";

const jwtSuccess =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1NiIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiJ9.xVnDDVXcYMTtCrDGeRt6-NzjWe-cmpF0PEpoOUEPolM";

const loginSuccess: LoginResponseBody = {
  id: "456",
  name: "John Doe",
  email: "johndoe@example.com",
  role: "admin",
};

export const sessionHandlers = [
  http.get<never, never, User, "/me">("/me", async ({ cookies }) => {
    await delay();
    const token = cookies.token;
    if (token) return HttpResponse.json(loginSuccess);
    return HttpResponse.json(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }),
  http.post<never, LoginRequestBody, LoginResponseBody, "/login">(
    "/login",
    async () => {
      await delay();
      return HttpResponse.json(loginSuccess, {
        headers: {
          "Set-Cookie": "token=" + jwtSuccess + "; Path=/; HttpOnly",
        },
      });
    }
  ),
];
