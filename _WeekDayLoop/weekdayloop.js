const tdWeekList = [];
const firstWeekDay =
  moment(`${inputYear} ${inputMonth}`)
    .startOf("month")
    .day()
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
for (let i = 1; i <= getLastDay; i += 1) {
  const weekDay = (firstWeekDay + (i - 1)) % 7; 
  tdWeekList.push(
    <th key={i} className="text-center" nowrap="nowrap">
      ({weekDays[weekDay]})
    </th>,
  );
}