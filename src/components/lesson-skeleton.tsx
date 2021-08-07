import React from "react";
import ContentLoader from "react-content-loader";

const LessonSkeleton: React.FC = () => {
    return <ContentLoader width="100%" height="40px" className="lesson-skeleton">
        <rect x={0} y={0} rx={20} ry={20} width={40} height={40} />
        <rect x={55} y={3} rx={5} ry={5} width={90} height={15} />
        <rect x={55} y={23} rx={5} ry={5} width={140} height={15} />
    </ContentLoader>
}

export default LessonSkeleton;
