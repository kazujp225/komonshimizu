'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssessmentSections, getAssessmentResultByScore } from '@/lib/mockData';
import type { AssessmentQuestion, AssessmentResult } from '@/types';
import AssessmentResults from './AssessmentResults';

interface Answer {
  questionId: string;
  value: string | string[];
}

export default function AssessmentForm() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  
  const sections = getAssessmentSections();
  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  
  const totalQuestions = sections.reduce((total, section) => total + section.questions.length, 0);
  const currentQuestionNumber = sections
    .slice(0, currentSectionIndex)
    .reduce((total, section) => total + section.questions.length, 0) + currentQuestionIndex + 1;
  
  const progress = (currentQuestionNumber / totalQuestions) * 100;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    const newAnswers = answers.filter(a => a.questionId !== questionId);
    newAnswers.push({ questionId, value });
    setAnswers(newAnswers);
  };

  const getAnswer = (questionId: string): string | string[] | undefined => {
    return answers.find(a => a.questionId === questionId)?.value;
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    sections.forEach(section => {
      section.questions.forEach(question => {
        const answer = getAnswer(question.id);
        if (answer) {
          if (question.type === 'single') {
            const option = question.options.find(opt => opt.value === answer);
            if (option) {
              totalScore += option.score * question.weight;
            }
          } else if (question.type === 'multiple' && Array.isArray(answer)) {
            answer.forEach(val => {
              const option = question.options.find(opt => opt.value === val);
              if (option) {
                totalScore += option.score * question.weight;
              }
            });
          }
        }
        
        // Calculate max possible score for this question
        if (question.type === 'single') {
          const maxScore = Math.max(...question.options.map(opt => opt.score));
          maxPossibleScore += maxScore * question.weight;
        } else {
          const totalMaxScore = question.options.reduce((sum, opt) => sum + opt.score, 0);
          maxPossibleScore += totalMaxScore * question.weight;
        }
      });
    });

    // Convert to 0-100 scale
    const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);
    return Math.min(100, Math.max(0, normalizedScore));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Assessment completed
      const score = calculateScore();
      const assessmentResult = getAssessmentResultByScore(score);
      setResult(assessmentResult || null);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1);
    }
  };

  const canProceed = () => {
    const answer = getAnswer(currentQuestion.id);
    if (currentQuestion.type === 'single') {
      return answer !== undefined;
    } else if (currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return false;
  };

  if (isCompleted && result) {
    return <AssessmentResults result={result} score={calculateScore()} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">
            質問 {currentQuestionNumber} / {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progress)}% 完了
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Section Title */}
      <motion.div
        key={currentSectionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-4">
          {currentSection.title}
        </div>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentSectionIndex}-${currentQuestionIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.label
                key={option.value}
                className="block cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <input
                    type={currentQuestion.type === 'single' ? 'radio' : 'checkbox'}
                    name={currentQuestion.id}
                    value={option.value}
                    checked={
                      currentQuestion.type === 'single'
                        ? getAnswer(currentQuestion.id) === option.value
                        : Array.isArray(getAnswer(currentQuestion.id)) && 
                          (getAnswer(currentQuestion.id) as string[]).includes(option.value)
                    }
                    onChange={(e) => {
                      if (currentQuestion.type === 'single') {
                        handleAnswer(currentQuestion.id, option.value);
                      } else {
                        const currentAnswer = getAnswer(currentQuestion.id) as string[] || [];
                        if (e.target.checked) {
                          handleAnswer(currentQuestion.id, [...currentAnswer, option.value]);
                        } else {
                          handleAnswer(
                            currentQuestion.id,
                            currentAnswer.filter(v => v !== option.value)
                          );
                        }
                      }
                    }}
                    className="mr-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700 font-medium flex-1">
                    {option.label}
                  </span>
                </div>
              </motion.label>
            ))}
          </div>

          {currentQuestion.type === 'multiple' && (
            <p className="mt-4 text-sm text-gray-500">
              ※ 複数選択可能です
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← 前の質問
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {currentSectionIndex === sections.length - 1 && 
           currentQuestionIndex === currentSection.questions.length - 1
            ? '結果を見る'
            : '次の質問 →'}
        </button>
      </div>
    </div>
  );
}