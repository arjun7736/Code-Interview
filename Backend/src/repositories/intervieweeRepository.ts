/* eslint-disable camelcase */

import { IInterviewee } from "../interfaces/modelInterface";
import IntervieweeDB from "../models/intervieweeModel";
import LinkDB from "../models/linkModel";
import QuestionDB from "../models/questionModel";

export async function findInterviewee(
  email: string
): Promise<IInterviewee | null> {
  return await IntervieweeDB.findOne({ email: email });
}

export async function createInterviewee(
  email: string,
  name: string,
  password: string,
  role?: string,
  profile_picture?: string
): Promise<IInterviewee | null> {
  return await IntervieweeDB.create({
    email,
    password,
    name,
    isBlocked: false,
    role,
    profile_picture,
  });
}

export async function getUserByEmail(
  email: string
): Promise<IInterviewee | null> {
  return await IntervieweeDB.findOne({ email: email });
}

export async function updateIntervieweePassword(
  email: string,
  password: string
): Promise<IInterviewee | null> {
  return await IntervieweeDB.findOneAndUpdate(
    { email: email },
    { password: password },
    { new: true }
  );
}

export async function updateIntervieweeProfile(
  id: string,
  name?: string,
  profile_picture?: string
): Promise<IInterviewee | null> {
  return IntervieweeDB.findByIdAndUpdate(
    { _id: id },
    { $set: { name: name, profile_picture: profile_picture } }
  );
}

export const getQuestionsById = async (id: string) => {
  return await QuestionDB.findOne({ questionSet: id });
};
export const getQuestionSet = async (link: string) => {
  return await LinkDB.findOne({ meetingLink: link });
};

export const getLinkById = async (id: string) => {
  return await LinkDB.findOne({ questionSet: id });
};

export const updateQuestionSetById = async (
  interviewee: string,
  result: string,
  questionSet: string
) => {
  return QuestionDB.findOneAndUpdate(
    { questionSet },
    {
      $push: {
        attentedInterviewees: {
          interviewee: interviewee,
          result: result,
        },
      },
    },
    { new: true, upsert: true }
  );
};
