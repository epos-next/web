import LoadingIndicator from "@components/loading-indicator";
import UiHelper from "@helpers/ui-helper";
import lodash from "lodash";
import React from "react";
import styled from "styled-components";
import useMarksPage from "../../hooks/useMarksPage";
import { Marks as MarksModel } from "../../models/marks";

const MarksTab: React.FC = () => {
    const { state } = useMarksPage();

    if (state.marks === null) return <LoadingContainer>
        <LoadingIndicator color="var(--light-primary)"/>
    </LoadingContainer>


    const periodsAmount = state.marks[Object.keys(state.marks)[0]].periods.length;
    const periods: MarksModel[""]["periods"][] = [];
    for (let i = 0; i < periodsAmount; i++) periods.push([]);

    for (let key of Object.keys(state.marks)) {
        if (state.marks[key].periods.length === 0) {
            for (let i = 0; i < periodsAmount; i++) periods[i].push({ all: [] });
        }

        state.marks[key].periods.forEach((period, periodIndex) => {
            periods[periodIndex].push(period);
        });

        if (state.marks[key].periods.length !== 0) {
            for (let i = state.marks[key].periods.length; i < periodsAmount; i++) {
                periods[i].push({ all: [] });
            }
        }
    }

    return <Container>
        <h2>Оценки</h2>
        <Table>
            {/* First column */ }
            <Subjects>
                <h3>Предмет</h3>
                {
                    Object.keys(state.marks).map((e, i) => {
                        return <Subject key={ `subject-${ i }-${ e }` }>{ UiHelper.formatSubjectName(e) }</Subject>
                    })
                }
            </Subjects>

            {/* All marks Scrolling component */ }
            <Marks>
                {
                    periods.map((period, periodIndex) => {
                        return <Period key={ `period-${ periodIndex }` }>
                            <h3>{ periodIndex + 1 } четверть</h3>

                            {
                                period.map((subject, subjectIndex) => {
                                    const key = `mark-${ subjectIndex }`;

                                    if (subject.all.length === 0) return <PrimaryMark key={ key }>
                                        &nbsp;
                                    </PrimaryMark>

                                    return <MarksGroup key={ key }>
                                        {
                                            subject.all.map((mark, markIndex) => {
                                                return <PrimaryMark
                                                    key={ `mark-${ subjectIndex }-${ markIndex }` }>
                                                    { mark.value }
                                                </PrimaryMark>
                                            })
                                        }

                                        {
                                            subject.total
                                                ? <TotalMark>{ subject.total }</TotalMark>
                                                : <PreTotalMark>
                                                    {
                                                        Math.ceil(lodash.sum(subject.all.map(e => e.value)) / subject.all.length)
                                                    }
                                                </PreTotalMark>
                                        }
                                    </MarksGroup>
                                })
                            }
                        </Period>
                    })
                }
            </Marks>

            <YearMarksGroup>
                <h3>Год</h3>
                {
                    Object.keys(state.marks).map((e, i) => {
                        if (state.marks === null) return <React.Fragment/>;
                        const content = state.marks[e].total ?? <React.Fragment>&nbsp;</React.Fragment>
                        return <TotalMark key={ `total-mark-${ i }` }>{ content }</TotalMark>;
                    })
                }
            </YearMarksGroup>
        </Table>
    </Container>
}

export default MarksTab;

const PreTotalMark = styled.div`
  color: #C5CAFE;
  margin-left: 10px;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  text-align: right;
  margin-bottom: 16px;
`;

const TotalMark = styled.div`
  margin-left: 10px;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #6D73FD;
  width: 100%;
  text-align: right;
  margin-bottom: 16px;

  @media screen and (max-width: 960px) {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 14px;
    margin-right: 20px;
  }
`;

const PrimaryMark = styled.div`
  font-size: 16px;
  color: var(--secondary);
  margin-right: 30px;
  line-height: 20px;
  margin-bottom: 16px;

  @media screen and (max-width: 960px) {
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 14px;
    margin-right: 20px;
  }
`;

const YearMarksGroup = styled.div`
  margin-left: 30px;

  ${ TotalMark } {
    margin-left: 0;
    text-align: center;
  }
`;

const MarksGroup = styled.div`
  display: flex;
`;

const Period = styled.div`
  flex: 0 0 auto;
`;

const Marks = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;

  ${ Period }:not(:last-child) {
    margin-right: 40px;
  }
`;

const Subject = styled.h5`
  font-size: 17px;
  line-height: 20px;
  color: var(--primary);
  margin-bottom: 16px;
  font-weight: normal;

  @media screen and (max-width: 960px) {
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 14px;
  }
`;

const Subjects = styled.div`
  flex: 0 0 auto;
  margin-right: 30px;
`;

const Table = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  max-width: min(866px, 100vw);

  @media screen and (max-width: 960px) {
    width: calc(100% - 40px);
  }

  h3 {
    margin-bottom: 20px;

    @media screen and (max-width: 960px) {
      margin-bottom: 10px;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 63px);
`;

const Container = styled.div`
  @media screen and (max-width: 1200px) {
    h2 {
      display: none;
    }
  }
`;
