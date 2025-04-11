'use client';

import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';

console.log("🛠️ awsExports 設定内容:", awsExports); // ← この行を追加

Amplify.configure(awsExports);
