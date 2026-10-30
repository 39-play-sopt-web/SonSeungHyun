import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import styled from '@emotion/styled';
import { getMovieById } from '../apis/movie';
import { BACKDROP_BASE_URL, POSTER_BASE_URL } from '../image';
import type { MovieDetail as MovieDetailType } from '../types/movieType';

const formatDate = (date: string) => {
  if (!date) return '개봉일 미정';
  const [year, month, day] = date.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

const formatRuntime = (runtime: number | null) => {
  if (!runtime) return '상영 시간 미정';
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
};

const formatMoney = (amount: number) =>
  amount > 0 ? `$${amount.toLocaleString('en-US')}` : '정보 없음';

const languageNames = new Intl.DisplayNames(['ko'], { type: 'language' });

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchData = async () => {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
        console.error('영화 상세 정보를 불러오는 데 실패했습니다.', error);
      }
    };
    fetchData();
  }, [movieId]);

  if (isError) return <Message>영화 정보를 불러오지 못했습니다.</Message>;
  if (!movie) return <Message>불러오는 중...</Message>;

  const {
    title,
    original_title,
    tagline,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    runtime,
    status,
    genres,
    overview,
    original_language,
    production_countries,
    spoken_languages,
    budget,
    revenue,
    vote_count
  } = movie;

  const infoList = [
    { label: '원제', value: original_title },
    { label: '원어', value: languageNames.of(original_language) ?? original_language },
    {
      label: '제작 국가',
      value: production_countries.map((country) => country.name).join(', ') || '정보 없음',
    },
    {
      label: '사용 언어',
      value: spoken_languages.map((language) => language.english_name).join(', ') || '정보 없음',
    },
    { label: '예산', value: formatMoney(budget) },
    { label: '수익', value: formatMoney(revenue) },
  ];

  return (
    <Container>
      <BackLink to="/">← 목록으로 돌아가기</BackLink>

      <Hero backdrop={backdrop_path ? `${BACKDROP_BASE_URL}${backdrop_path}` : null}>
        {poster_path ? (
          <Poster src={`${POSTER_BASE_URL}${poster_path}`} alt={title} />
        ) : (
          <NoPoster>이미지 없음</NoPoster>
        )}

        <Summary>
          <Title>{title}</Title>
          {tagline && <Tagline>{tagline}</Tagline>}

          <MetaRow>
            <RatingBadge>★ {vote_average.toFixed(1)}</RatingBadge>
            <span>{formatDate(release_date)}</span>
            <span>{formatRuntime(runtime)}</span>
            <span>투표 {vote_count.toLocaleString()}명</span>
            <StatusBadge>{status}</StatusBadge>
          </MetaRow>

          <GenreList>
            {genres.map((genre) => (
              <GenreTag key={genre.id}>{genre.name}</GenreTag>
            ))}
          </GenreList>
        </Summary>
      </Hero>

      <Section>
        <SectionTitle>줄거리</SectionTitle>
        <Overview>{overview || '줄거리 정보가 없습니다.'}</Overview>
      </Section>

      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <InfoGrid>
          {infoList.map(({ label, value }) => (
            <InfoCard key={label}>
              <InfoLabel>{label}</InfoLabel>
              <InfoValue>{value}</InfoValue>
            </InfoCard>
          ))}
        </InfoGrid>
      </Section>
    </Container>
  );
};

export default MovieDetail;

const Container = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mint};
`;

const Hero = styled.section<{ backdrop: string | null }>`
  display: flex;
  gap: 32px;
  padding: 32px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.card};
  background-image: ${({ backdrop }) =>
    backdrop
      ? `linear-gradient(to right, rgba(26, 26, 36, 0.95) 30%, rgba(26, 26, 36, 0.6)), url(${backdrop})`
      : 'none'};
  background-size: cover;
  background-position: center;
`;

const Poster = styled.img`
  width: 200px;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`;

const NoPoster = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const Tagline = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.gray};
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
`;

const RatingBadge = styled.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
  color: #000;
  background-color: ${({ theme }) => theme.colors.mint};
`;

const StatusBadge = styled.span`
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  font-size: 12px;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const GenreTag = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const Section = styled.section`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 18px;
`;

const Overview = styled.p`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
`;

const InfoCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.card};
`;

const InfoLabel = styled.p`
  margin-bottom: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
`;

const InfoValue = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const Message = styled.p`
  margin-top: 80px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray};
`;