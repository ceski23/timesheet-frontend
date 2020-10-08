import { Record } from 'api/records';
import WorkIcon from '@material-ui/icons/WorkOutline';
import { green } from '@material-ui/core/colors';
import VacationIcon from '@material-ui/icons/BeachAccessOutlined';
import ChildcareIcon from '@material-ui/icons/ChildCareOutlined';
import SickIcon from '@material-ui/icons/LocalHospitalOutlined';
import TrainingIcon from '@material-ui/icons/SchoolOutlined';

export const getRecordData = (record: Record) => {
  switch (record.type) {
    case 'normal':
      return { icon: WorkIcon, color: green.A700 };

    case 'vacationLeave':
      return { icon: VacationIcon, color: '#795548' };

    case 'childcare':
      return { icon: ChildcareIcon, color: '#ff7961' };

    case 'sickLeave':
      return { icon: SickIcon, color: '#2196f3' };

    case 'trainingLeave':
      return { icon: TrainingIcon, color: '#673ab7' };

    case 'leaveOnRequest':
      return { icon: SickIcon, color: '#ff9800' };

    default: {
      const exhaustiveCheck: never = record.type;
      return exhaustiveCheck;
    }
  }
};
