import { eyebrow_left_path_2 } from './base64_eyebrow_left_2';
import { eyebrow_left_path_3 } from './base64_eyebrow_left_3';
import { eyebrow_left_path_4 } from './base64_eyebrow_left_4';
import { eyebrow_left_path_5 } from './base64_eyebrow_left_5';

interface EyebrowData {
     image: string;
     path: string;
     name: string;
}

export const eyebrowData: EyebrowData[] = [

     {
          // Tạm thời dùng cùng một mẫu cho các style khác
          image: '/left_eyebrow_sample_2.png',
          path: eyebrow_left_path_2,
          name: 'Kiểu 1',
     },
     {
          image: '/left_eyebrow_sample_3.png',
          path: eyebrow_left_path_3,
          name: 'Kiểu 2',
     },
     {
          image: '/left_eyebrow_sample_4.png',
          path: eyebrow_left_path_4,
          name: 'Kiểu 3',
     },
     {
          image: '/left_eyebrow_sample_5.png',
          path: eyebrow_left_path_5,
          name: 'Kiểu 4',
     },
];
