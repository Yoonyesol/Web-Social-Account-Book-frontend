import { persistor } from "..";

type InputTimeType = string | Date | number;

export const setDate = (dateString: InputTimeType, view: boolean): string => {
  const currentDate = new Date();
  const date = new Date(dateString);

  // 현재 날짜와 동일한 날짜인지 확인
  const isToday = currentDate.toDateString() === date.toDateString();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // postView인 경우(상세보기)
  if (view) {
    return `${year}.${month < 10 ? "0" : ""}${month}.${day < 10 ? "0" : ""}${day} (${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes})`;
  }

  // 커뮤니티 목록
  // 오늘인 경우 시간을 반환
  if (isToday) {
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  } else {
    // 오늘이 아닌 경우 년-월-일을 반환
    return `${year}.${month < 10 ? "0" : ""}${month}.${day < 10 ? "0" : ""}${day}`;
  }
};

export const dateToYearMonthFormat = (dateString: InputTimeType): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다.
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}`;

  return formattedDate;
};

export const purge = async () => {
  await persistor.purge();
};
