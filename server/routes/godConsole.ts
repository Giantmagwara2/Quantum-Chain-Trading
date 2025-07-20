import { Router } from "express"
import { aiTestingAgent } from "../services/aiTestingAgent"
import { isAuthenticated } from "../replitAuth"

const router = Router()

// Get AI Agent status
router.get("/api/god-console/agent-status", isAuthenticated, async (req, res) => {
  try {
    const status = aiTestingAgent.getStatus()
    res.json(status)
  } catch (error) {
    console.error("Error fetching AI agent status:", error)
    res.status(500).json({ message: "Failed to fetch AI agent status" })
  }
})

// Get system health
router.get("/api/god-console/system-health", isAuthenticated, async (req, res) => {
  try {
    const health = aiTestingAgent.getSystemHealth()
    res.json(health)
  } catch (error) {
    console.error("Error fetching system health:", error)
    res.status(500).json({ message: "Failed to fetch system health" })
  }
})

// Get test results
router.get("/api/god-console/test-results", isAuthenticated, async (req, res) => {
  try {
    const results = aiTestingAgent.getTestResults()
    res.json(results)
  } catch (error) {
    console.error("Error fetching test results:", error)
    res.status(500).json({ message: "Failed to fetch test results" })
  }
})

// Execute console command
router.post("/api/god-console/execute", isAuthenticated, async (req, res) => {
  try {
    const { command } = req.body
    if (!command) {
      return res.status(400).json({ message: "Command is required" })
    }

    const result = await aiTestingAgent.executeCommand(command)
    res.json({ result })
  } catch (error) {
    console.error("Error executing command:", error)
    res.status(500).json({ message: "Failed to execute command" })
  }
})

// Generate code
router.post("/api/god-console/generate-code", isAuthenticated, async (req, res) => {
  try {
    const { specification } = req.body
    if (!specification) {
      return res.status(400).json({ message: "Code specification is required" })
    }

    const code = await aiTestingAgent.generateCode(specification)
    res.json({ code })
  } catch (error) {
    console.error("Error generating code:", error)
    res.status(500).json({ message: "Failed to generate code" })
  }
})

// Feed learning data to AI agent
router.post("/api/god-console/feed-learning", isAuthenticated, async (req, res) => {
  try {
    const { data } = req.body
    if (!data) {
      return res.status(400).json({ message: "Learning data is required" })
    }

    await aiTestingAgent.feedLearningData(data)
    res.json({ message: "Learning data processed successfully" })
  } catch (error) {
    console.error("Error feeding learning data:", error)
    res.status(500).json({ message: "Failed to process learning data" })
  }
})

// Control AI agent (activate/deactivate)
router.post("/api/god-console/control-agent", isAuthenticated, async (req, res) => {
  try {
    const { action } = req.body
    if (!action || !["activate", "deactivate"].includes(action)) {
      return res.status(400).json({ message: "Valid action (activate/deactivate) is required" })
    }

    if (action === "activate") {
      aiTestingAgent.activate()
    } else {
      aiTestingAgent.deactivate()
    }

    res.json({ message: `AI agent ${action}d successfully` })
  } catch (error) {
    console.error("Error controlling AI agent:", error)
    res.status(500).json({ message: "Failed to control AI agent" })
  }
})

export default router
