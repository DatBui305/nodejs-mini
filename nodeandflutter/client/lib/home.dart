import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: [
          ElevatedButton(onPressed: () {}, child: const Text('CREATE')),
          ElevatedButton(onPressed: () {}, child: const Text('READ')),
          ElevatedButton(onPressed: () {}, child: const Text('UPDATE')),
          ElevatedButton(onPressed: () {}, child: const Text('DELETE')),
        ],
      ),
    );
  }
}
