import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface AgentStatus {
  type: string;
  status: string;
  activity: string;
  dataPoints: number;
  lastUpdate: string;
}

export default function MultiAgentStatus() {
  const [realtimeData, setRealtimeData] = useState<AgentStatus[]>([]);

  const { data: agentStatus } = useQuery({
    queryKey: ['/api/agents/status'],
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  useEffect(() => {
    // WebSocket connection for real-time updates
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'subscribe_agent_updates' }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'agent_status' || data.type === 'agent_status_update') {
        setRealtimeData(data.data);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const agents = realtimeData.length > 0 ? realtimeData : agentStatus || [];

  const getAgentName = (type: string) => {
    switch (type) {
      case 'market': return 'Market Agent';
      case 'risk': return 'Risk Agent';
      case 'evaluation': return 'Evaluation Agent';
      case 'portfolio': return 'Portfolio Agent';
      default: return type;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {agents.map((agent: AgentStatus) => (
        <div key={agent.type} className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[var(--quantum-emerald)] rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">{getAgentName(agent.type)}</span>
        </div>
      ))}
    </div>
  );
}
