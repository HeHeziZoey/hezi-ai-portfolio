"use client";

import { projects } from "@/data/portfolio";
import { BlobCharacter } from "./blob-character";

const feedbackByIndex = ["pop", "squash", "peek"] as const;
const projectCharacterSizes = [60, 94, 86];

export function CharacterLayer({ currentProject }: { currentProject: number }) {
  return (
    <div className="character-layer" aria-hidden="true">
      <BlobCharacter
        color="#161616"
        size={68}
        label="黑色作品集角色"
        className="home-pet pet-black"
      />
      {projects.map((project, index) => (
        <BlobCharacter
          key={project.id}
          color={project.accent}
          size={projectCharacterSizes[index]}
          label={`${project.number} 项目角色`}
          current={index === currentProject}
          feedback={index === currentProject ? feedbackByIndex[index] : "none"}
          className={`home-pet project-pet pet-project-${index + 1}`}
        />
      ))}
    </div>
  );
}
