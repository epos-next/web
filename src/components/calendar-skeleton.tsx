import React from "react";
import ContentLoader from "react-content-loader";
import { Container, Header, Title, Grid } from "@components/calendar";

const CalendarSkeleton: React.FC = () => {
    return <Container>
        {/*  Header  */ }
        <Header>
            <Title>Календарь</Title>
            <ContentLoader width="60px" height="20px" className="calendar-skeleton">
                <rect x={ 0 } y={ 0 } rx={ 3 } ry={ 3 } width={ 60 } height={ 20 }/>
            </ContentLoader>
        </Header>

        {/*  Calendar  */ }
        <Grid>
            <ContentLoader height="220px">
                {/* Day of the week */}
                <rect x={ 10 } y={ 10 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 48 } y={ 10 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 87 } y={ 10 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 126 } y={ 10 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 166 } y={ 10 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 206 } y={ 10 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 245 } y={ 10 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>

                {/* Week 1 */}
                <rect x={ 10 } y={ 55 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 48 } y={ 55 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 87 } y={ 55 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 126 } y={ 55 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 166 } y={ 55 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 206 } y={ 55 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 245 } y={ 55 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>

                {/* Week 2 */}
                <rect x={ 10 } y={ 100 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 48 } y={ 100 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 87 } y={ 100 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 126 } y={ 100 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 166 } y={ 100 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 206 } y={ 100 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 245 } y={ 100 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>

                {/* Week 3 */}
                <rect x={ 10 } y={ 145 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 48 } y={ 145 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 87 } y={ 145 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 126 } y={ 145 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 166 } y={ 145 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 206 } y={ 145 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 245 } y={ 145 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>

                {/* Week 4 */}
                <rect x={ 10 } y={ 190 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 48 } y={ 190 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 87 } y={ 190 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 126 } y={ 190 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 166 } y={ 190 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 206 } y={ 190 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
                <rect x={ 245 } y={ 190 } rx={ 5 } ry={ 3 } width={ 25 } height={ 30 }/>
            </ContentLoader>
        </Grid>
    </Container>
}

export default CalendarSkeleton;
