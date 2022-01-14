# Signup Flow README

---

The project has been created as a part of Bit2Byte Bootcamp conducted by Real Dev Squad. The goal of the project is to learn and implement Test Driven Development (TDD). All the pages have been created using Test Driven Development where I wrote test suites and saw them fail and then implemented features making them pass.

This project has been hoisted on Heroku: [https://production-signup-flow-tdd.herokuapp.com/](https://production-signup-flow-tdd.herokuapp.com/)

## This project makes use of the following packages

---

- react-router-dom 6
- React testing library
- jest

## This project contains the following pages

---

- [The Signup Page](https://production-signup-flow-tdd.herokuapp.com)
- [The OTP Page](https://production-signup-flow-tdd.herokuapp.com/otp)
- [The Referral Page](https://production-signup-flow-tdd.herokuapp.com/referral)
- [Waiting-List Page](https://production-signup-flow-tdd.herokuapp.com/waiting-list)
- [Signed Up Page](https://production-signup-flow-tdd.herokuapp.com/signed-up/WE4ge)

## **The Signup Page**

---

The signup route contains three input fields namely **Email**, **Password**, and **Confirm-Password** fields with a **Submit Button**

**Email Field**

- `Only valid email is accepted consisting of '@' and a '.'`
- `If the user navigates away and starts filling another field, then the border color of the input field is changed to red`

**Password Field**

- `While entering the password the strength of a password is tested and a label shows up indicating password strength as Weak or Strong`

**Confirm Password Field**

- `If the password does not match then the border color of the input box is changed to red and the user is acknowledged with the proper message`

**Submit Button**

- `Submit button is disabled by default and is only enabled when all the fields are filled and satisfies all the constraints`

## The OTP Page

---

The OTP page contains four input boxes and a label that shows OTP. This page has two buttons to **Clear** and **Verify** **OTP**

**Input Boxes**

- `All input boxes only accept numbers`
- `Focus is automatically transferred to the next input box once the current input box is filled`

**Clear Button and Verify OTP Button**

- `Clear button on click clears all the input boxes`
- `Verify OTP button is disabled by default`
- `Verify OTP button is only enabled if all input boxes are filled`
- `If Right OTP is entered the user will be navigated to the next page else acknowledgment of incorrect OTP is shown`

## The Referral Page

---

The Referral page allows users to enter referral code if the user has it

**Option Labels**

- `If the user selects **Yes I do have** a label then **Enter your referral code** section is shown to the user`
- `If the user select **No, I wish I had referral** option then he is navigated to the **Waiting-List page**`

**Referral Code Section**

- `Input box allows entering referral code of length five`
- `If the referral code is not valid then the user is acknowledged with a proper message`
- `If the referral code is valid then the user is navigated to the **Signed Up page**`

## **Waiting-List or Signed Up Page**

---

- `If the referral code is valid then user gets signed up else the user is added to the Waiting-List and appropriate message is shown`
