import React from 'react';

interface ServerFailureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ServerFailureModal({ isOpen, onClose }: ServerFailureModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-pop-in border-4 border-red-100">
                <h3 className="text-xl font-black text-center text-red-500 mb-4">
                    通信エラー
                </h3>
                <p className="text-center font-bold text-slate-700 mb-6 whitespace-pre-line">
                    サーバーとの通信に失敗しました。
                    {"\n"}
                    ポイントは獲得できませんでした。
                </p>
                <button
                    onClick={onClose}
                    className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-colors"
                >
                    とじる
                </button>
            </div>
        </div>
    );
}
