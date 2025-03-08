
interface IResult {
  message: string
}

const businessHours = [9, 18];

export function purchase() : IResult {
  const currentHour = new Date().getHours();
  const [open, close] = businessHours;

  if (currentHour > open && currentHour < close){
    return { message: 'Success' };
  }

  return { message: 'Error'};
}