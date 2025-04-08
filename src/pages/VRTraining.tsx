
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Play, 
  Sparkles, 
  Star, 
  Video 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { vrTrainingModules } from "@/data/vrData";
import { VRTrainingModule } from "@/types/vehicle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const VRTraining = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<VRTrainingModule | null>(null);
  const [showLaunchDialog, setShowLaunchDialog] = useState(false);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-success text-success-foreground";
      case "intermediate": return "bg-warning text-warning-foreground";
      case "advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const handleLaunchModule = (module: VRTrainingModule) => {
    setSelectedModule(module);
    setShowLaunchDialog(true);
  };

  const handleDownloadModule = (module: VRTrainingModule) => {
    toast.info(`Downloading ${module.title}`, {
      description: "The VR training module will be available for offline use."
    });
  };

  const launchVRTraining = () => {
    setShowLaunchDialog(false);
    if (!selectedModule) return;
    
    toast.success("Launching VR Training", {
      description: `${selectedModule.title} is being prepared for your VR device.`
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">VR Training Environment</h1>
            <p className="text-muted-foreground mt-1">Interactive training modules for maintenance procedures</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <GraduationCap className="mr-2 h-4 w-4" />
              My Progress
            </Button>
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              Explore Modules
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Training Overview</CardTitle>
            <CardDescription>Your progress across all training modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-secondary/30 rounded-lg p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{vrTrainingModules.length}</div>
                  <div className="text-sm text-muted-foreground">Available Modules</div>
                </div>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(vrTrainingModules.reduce((acc, curr) => acc + curr.completionRate, 0) / vrTrainingModules.length)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Average Completion</div>
                </div>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {vrTrainingModules.reduce((acc, curr) => acc + curr.duration, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Minutes</div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-4">
              <TabsList>
                <TabsTrigger value="all">All Modules</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vrTrainingModules.map((module) => (
                <Card key={module.id} className="hover:shadow-md transition-all border-border/80">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{module.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Completion:</span>
                          <span className="font-medium">{module.completionRate}%</span>
                        </div>
                      </div>
                      <Progress value={module.completionRate} className="h-2" />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Components covered:</h4>
                        <div className="flex flex-wrap gap-1">
                          {module.componentsCovered.map((component, index) => (
                            <Badge key={index} variant="outline" className="bg-background/50">
                              {component}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex gap-2 w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownloadModule(module)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleLaunchModule(module)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Launch
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Training Path</CardTitle>
              <CardDescription>Customized sequence based on your maintenance role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-border">
                {vrTrainingModules.slice(0, 3).map((module, index) => (
                  <div key={module.id} className="mb-6 relative">
                    <div className="absolute left-[-30px] flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                      {index + 1}
                    </div>
                    <h3 className="text-base font-medium">{module.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                    <div className="flex items-center gap-3">
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{module.duration} min</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLaunchModule(module)}
                      >
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="ml-[-8px]">
                  View Complete Path <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Training Resources</CardTitle>
              <CardDescription>Additional materials and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Maintenance Handbook</h3>
                    <p className="text-sm text-muted-foreground mb-2">Complete reference for all vehicle components</p>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      View Documentation <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Tutorial Videos</h3>
                    <p className="text-sm text-muted-foreground mb-2">Step-by-step guides for maintenance procedures</p>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      Browse Videos <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium">Certification Program</h3>
                    <p className="text-sm text-muted-foreground mb-2">Complete modules to earn maintenance certifications</p>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      View Certifications <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Dialog open={showLaunchDialog} onOpenChange={setShowLaunchDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedModule && (
            <>
              <DialogHeader>
                <DialogTitle>Launch VR Training</DialogTitle>
                <DialogDescription>Prepare to start {selectedModule.title}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    <img 
                      src={selectedModule.steps[0].imageUrl || "https://images.unsplash.com/photo-1616588589676-62b3bd4108d6?w=800&auto=format&fit=crop"}
                      alt={selectedModule.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getDifficultyColor(selectedModule.difficulty)}>
                      {selectedModule.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{selectedModule.duration} minutes</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {selectedModule.description}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Training Steps</h3>
                  <div className="space-y-3">
                    {selectedModule.steps.map((step, index) => (
                      <div key={step.id} className="flex gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{step.title}</h4>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 w-full">
                  <Button variant="outline" className="sm:flex-1" onClick={() => setShowLaunchDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="outline" className="sm:flex-1" onClick={() => handleDownloadModule(selectedModule)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download for Later
                  </Button>
                  <Button className="sm:flex-1" onClick={launchVRTraining}>
                    <Play className="mr-2 h-4 w-4" />
                    Launch Now
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VRTraining;
