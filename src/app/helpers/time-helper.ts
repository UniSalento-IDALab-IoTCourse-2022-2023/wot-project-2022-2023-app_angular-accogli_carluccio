export class TimeHelper {
  private static monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  private static formatDate(date: Date): string {
    const currentDate = new Date();
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return `${date.getDate()} ${TimeHelper.monthNames[date.getMonth()]}` + (date.getFullYear() !== currentDate.getFullYear() ? `, ${date.getFullYear()}` : '');
    }
  }

  private static formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  public static formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const formattedDate = TimeHelper.formatDate(date);
    const formattedTime = TimeHelper.formatTime(date);
    return `${formattedTime}, ${formattedDate}`;
  }



  public static formatSeconds(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60);

    let formattedTime = "";

    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
    if (minutes > 0) {
      formattedTime += `${minutes}m `;
    }
    formattedTime += `${remainingSeconds}s`;

    return formattedTime.trim();
  }
}
/*
// Esempio di utilizzo della classe Times
const timestamp1 = "2024-06-29T14:33:40.558";
console.log(TimeHelper.formatTimestamp(timestamp1)); // Esempio: "29 June, 14:33"

const timestamp2 = "2024-06-28T12:20:00.000";
console.log(TimeHelper.formatTimestamp(timestamp2)); // Esempio: "Yesterday, 12:20"

const timestamp3 = "2023-05-24T20:00:00.000";
console.log(TimeHelper.formatTimestamp(timestamp3)); // Esempio: "24 May, 20:00"
*/
