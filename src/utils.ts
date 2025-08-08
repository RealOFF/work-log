export function formatDuration(minutes: number): string {
	if (minutes < 60) {
		return `${Math.round(minutes)}m`;
	}
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = Math.round(minutes % 60);
	return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatTime(date: Date): string {
	return date.toLocaleTimeString('en-US', { 
		hour: '2-digit', 
		minute: '2-digit',
		hour12: false 
	});
}