import axios from 'axios';

export interface PointAwardResponse {
    earned_points: number;
    total_points: number;
    multiplier: number;
    play_count: number;
}

export const awardPoints = async (levelId: string, score: number): Promise<PointAwardResponse> => {
    const response = await axios.post('/api/points/award', {
        level_id: levelId,
        score: score
    });
    return response.data;
};

export const getPoints = async (): Promise<number> => {
    const response = await axios.get('/api/points');
    return response.data.points;
};
