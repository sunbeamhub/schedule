import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { OperationMenus } from 'schedule/components/OperationMenus';
import { ScheduleTableView } from 'schedule/components/ScheduleTableView';
import { useSchedule } from 'schedule/hooks';

function Schedule() {
  const { scheduleList, scheduleTableViewList } = useSchedule();
  const { t: t1 } = useTranslation('common');
  const { t: t2 } = useTranslation('schedule');

  useEffect(() => {
    if (
      !('Notification' in window) ||
      !('serviceWorker' in navigator) ||
      Notification.permission !== 'granted'
    ) {
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const options = {
      body: scheduleList
        .filter(({ date }) => date.getTime() === today.getTime())
        .map(
          ({ name, workStatus }) => `${name} ${t2('workStatus.' + workStatus)}`
        )
        .join('\n'),
      icon: 'logo192.png',
      tag: '' + today.getTime(),
    };
    const title =
      t2('today') +
      ` (${t2('week.week')} ${t2('week.' + today.getDay())}) ` +
      t1('navigation.schedule');

    navigator.serviceWorker
      .getRegistration()
      .then((reg) => reg?.showNotification(title, options))
      .catch(console.error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScheduleTableView scheduleTableViewList={scheduleTableViewList} />
      <OperationMenus />
    </>
  );
}

export default Schedule;
