"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, Share2, Save, HelpCircle, Plus, ChevronDown } from 'lucide-react'

const GAME_TYPES = ["囚徒困境", "协调博弈", "零和博弈", "重复博弈"]

export default function StrategyDesignPage() {
  const [gameType, setGameType] = useState(GAME_TYPES[0])
  const [participants, setParticipants] = useState([{ name: "Player 1", strategies: ["Cooperate", "Defect"] }])
  const [payoffMatrix, setPayoffMatrix] = useState([[3, 0], [5, 1]])

  const addParticipant = () => {
    setParticipants([...participants, { name: `Player ${participants.length + 1}`, strategies: ["Cooperate", "Defect"] }])
  }

  return (
    <div className="flex min-h-screen bg-[#f5f6ff]">
      {/* Left Sidebar (Navigation) */}
      <aside className="w-64 bg-[#1e2b6b] text-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold tracking-tight">战略博弈</span>
          </div>
          <nav>
            <ul className="space-y-2">
              {["首页", "策略设计", "博弈模拟", "策略推荐", "社区", "历史策略"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-sm rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Central Design Area */}
        <main className="flex-1 p-8 max-w-[800px]">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#1e2b6b] mb-2">策略设计</h1>
            <p className="text-gray-500">创建和优化你的博弈策略</p>
          </div>

          <Card className="mb-6 border-0 shadow-lg rounded-xl">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">策略输入</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addParticipant}
                  className="bg-white hover:bg-gray-50 border-gray-200"
                >
                  <Plus className="mr-2 h-4 w-4" /> 添加参与者
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">博弈类型</label>
                  <Select value={gameType} onValueChange={setGameType}>
                    <SelectTrigger className="w-full">
                      <SelectValue>{gameType}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {GAME_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left py-4 px-4 bg-gray-50 rounded-l-lg text-sm font-medium text-gray-700">
                          参与者 \ 策略
                        </th>
                        {participants[0]?.strategies.map((strategy, idx) => (
                          <th
                            key={idx}
                            className={`text-left py-4 px-4 bg-gray-50 text-sm font-medium text-gray-700 ${
                              idx === participants[0].strategies.length - 1 ? "rounded-r-lg" : ""
                            }`}
                          >
                            {strategy}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, rowIdx) => (
                        <tr key={rowIdx}>
                          <td className="py-4 px-4 text-sm text-gray-700">{participant.name}</td>
                          {participant.strategies.map((_, colIdx) => (
                            <td key={colIdx} className="py-4 px-4">
                              <Input
                                type="number"
                                className="w-20 bg-white border-gray-200"
                                value={payoffMatrix[rowIdx]?.[colIdx] || 0}
                                onChange={(e) => {
                                  const newMatrix = [...payoffMatrix]
                                  newMatrix[rowIdx] = newMatrix[rowIdx] || []
                                  newMatrix[rowIdx][colIdx] = Number(e.target.value)
                                  setPayoffMatrix(newMatrix)
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-xl">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-medium">实时反馈</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">策略效果</div>
                  <div className="text-lg font-semibold text-[#1e2b6b]">较好</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">潜在收益</div>
                  <div className="text-lg font-semibold text-[#1e2b6b]">3.5</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">风险等级</div>
                  <div className="text-lg font-semibold text-[#1e2b6b]">中等</div>
                </div>
              </div>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <BarChart className="h-24 w-24 text-gray-400" />
                <span className="ml-2 text-gray-500">收益可视化图表</span>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l border-gray-100 p-6 bg-white">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#1e2b6b] mb-4">智能推荐</h2>
            <ul className="space-y-3">
              {["相似策略 1", "最佳实践 1", "最优策略"].map((recommendation) => (
                <li key={recommendation}>
                  <a href="#" className="text-gray-600 hover:text-[#1e2b6b] text-sm">
                    {recommendation}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1e2b6b] mb-4">策略分析</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              此策略倾向于合作，但存在中等风险。适合于可以建立信任的重复互动。建议在实施过程中注意风险控制。
            </p>
          </div>

          <div className="fixed bottom-6 right-12  space-x-3">
            <Button variant="default" className="bg-[#1e2b6b] hover:bg-[#2a3a8c] text-white shadow-md">
              <Save className="mr-2 h-4 w-4" /> 保存策略
            </Button>
            <Button variant="outline" className="border-gray-200 hover:bg-gray-50 shadow-md">
              <Share2 className="mr-2 h-4 w-4" /> 分享
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}