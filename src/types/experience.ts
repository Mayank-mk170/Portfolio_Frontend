export interface Experience {
    id: number;
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string | null;
    currentlyWorking: boolean;
    order: number;
}