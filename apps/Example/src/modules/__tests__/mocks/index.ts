import { Player } from "../../player/domain";
import { Team } from "../../team/domain";

export const defaultAvatar = [
  {
    assetId: 'CkfPqx_CbjqnefuAFLnBN',
    category: 'SKINS',
    color: null,
    type: 'SKINS',
  },
];

export const mockPlayer: Player = {
  id: "645affce-23c2-4a3b-a0cd-8b0fd4ab448f",
  name: "John",
  avatar: defaultAvatar,
  points: 0,
  teamId: "645affce-23c2-4a3b-a0cd-8b0fd4ab448f",
};

export const mockTeam: Team = {
  id: "645affce-23c2-4a3b-a0cd-8b0fd4ab448f",
  name: "Team 1",
  points: 0,
  captain: "645affce-23c2-4a3b-a0cd-8b0fd4ab448f",
  members: ["645affce-23c2-4a3b-a0cd-8b0fd4ab448f"],
  contributions: {},
};
