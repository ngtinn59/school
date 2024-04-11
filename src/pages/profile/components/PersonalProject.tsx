import CardWithTitle from "../../../ui/Card/CardWithTitle";
import { PROFILE_DATA_CATEGORY } from "../../../utils/constants";
import { PersonalProjectType } from "../../../utils/type";
import profile_personal_project from "../../../assets/profile_personal_project.svg";
import PersonalProjectWrapper from "./PersonalProjectWrapper";

type Props = { personalProjectList: PersonalProjectType[] };

export default function PersonalProject({ personalProjectList }: Props) {
  return (
    <CardWithTitle
      title={PROFILE_DATA_CATEGORY.personalProjects.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.personalProjects.description}
      icon={profile_personal_project}
    >
      {personalProjectList &&
        personalProjectList.map(
          (project: PersonalProjectType, index: number) => (
            <PersonalProjectWrapper
              project={project}
              type="personal-project"
              key={`project-${index}`}
            />
          )
        )}
    </CardWithTitle>
  );
}
